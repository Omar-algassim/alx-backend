#!/usr/bin/python3
"""page range"""


def index_range(page: int, page_size: int) -> tuple:
    """return the page range crosponding on pag number and size"""
    return (((page * page_size) - page_size, page * page_size))
