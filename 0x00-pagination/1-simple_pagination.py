#!/usr/bin/env python3
"""server module"""
import csv
import math
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple:
    """return the page range crosponding on pag number and size"""
    return (((page * page_size) - page_size, page * page_size))


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
        if start < len(data) and end <= len(data):
            return data[start:end]
        return []
