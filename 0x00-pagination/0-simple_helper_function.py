#!/usr/bin/env python3
"""page range"""


def index_range(page: int, page_size: int) -> tuple:
    """return the page range crosponding on pag number and size"""
    return ((((page - 1) * page_size) - page_size, (page - 1) * page_size))
