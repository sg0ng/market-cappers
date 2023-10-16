from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from csv import writer
import requests
from bs4 import BeautifulSoup
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By

from selenium import webdriver

driver = Chrome()

driver.get("https://www.tradingview.com/screener/?aff_id=4191")

content = driver.find_elements(By.CLASS_NAME, "tv-data-table__thead-row")

print(content)
