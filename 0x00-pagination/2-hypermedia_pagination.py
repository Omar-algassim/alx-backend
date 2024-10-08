#!/usr/bin/env python3
"""server module"""
import csv
import math
from typing import List, Dict
index_range = __import__('0-simple_helper_function').index_range


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """return list of page content"""
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0
        start, end = index_range(page, page_size)
        data = self.dataset()
        if len(data) < start:
            return []
        return data[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """functoin return information about page like
        page_size and number etc.."""
        dataset = self.dataset()
        data = self.get_page(page, page_size)
        next_page = page + 1
        prev_page = page - 1
        hyper = {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": None if next_page > len(dataset) else next_page,
            "prev_page": prev_page if prev_page > 0 else None,
            "total_pages": len(dataset)
                 }
        return hyper
