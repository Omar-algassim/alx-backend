#!/usr/bin/env python3
"""FIFO caching"""
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """FIFO cache system"""
    def __init__(self):
        """initialize"""
        super().__init__()

    def put(self, key, item):
        """put item in cache memory"""
        if not key or not item:
            return
        key_list = [*self.cache_data.keys()]
        if len(self.cache_data) >= self.MAX_ITEMS\
                and key not in self.cache_data:
            self.cache_data.pop(key_list[0])
            print(f"DISCARD: {key_list[0]}")
        self.cache_data[key] = item

    def get(self, key):
        """get item from cache"""
        return self.cache_data.get(key)
