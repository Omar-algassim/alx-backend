#!/usr/bin/env python3
""" BaseCaching module
"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """basic cache inherits from the basecaching"""

    def __init__(self):
        """initiliaze"""
        super().__init__()

    def put(self, key, item):
        """put item in memory"""
        if not key or not item:
            return
        self.cache_data[key] = item

    def get(self, key):
        """get item from cache"""
        return self.cache_data.get(key)
