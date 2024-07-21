#!/usr/bin/env python3
"""page range"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple:
    """return the page range crosponding on pag number and size"""
    return (((page * page_size) - page_size, page * page_size))
