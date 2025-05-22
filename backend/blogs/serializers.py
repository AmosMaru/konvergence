
# serializers.py
from rest_framework import serializers
from .models import Post, Category, Comment


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'name', 'email', 'body', 'created', 'active']


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    comments = CommentSerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'body', 'publish', 
                 'status', 'categories', 'comments']
        
    def create(self, validated_data):
        categories_data = self.context['request'].data.get('categories', [])
        post = Post.objects.create(**validated_data)
        
        # Add categories
        if categories_data:
            for category_id in categories_data:
                try:
                    category = Category.objects.get(id=category_id)
                    post.categories.add(category)
                except Category.DoesNotExist:
                    pass
        
        return post
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.body = validated_data.get('body', instance.body)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        
        # Update categories if provided
        categories_data = self.context['request'].data.get('categories', None)
        if categories_data is not None:
            instance.categories.clear()
            for category_id in categories_data:
                try:
                    category = Category.objects.get(id=category_id)
                    instance.categories.add(category)
                except Category.DoesNotExist:
                    pass
        
        return instance
