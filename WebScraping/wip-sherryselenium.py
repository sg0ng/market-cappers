from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from csv import writer
from bs4 import BeautifulSoup
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By


options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])

driver = Chrome()
driver.get("https://www.tradingview.com/screener/?aff_id=4191")

table = driver.find_element(By.CLASS_NAME, "tv-data-table__tbody")

#soup
soup = BeautifulSoup(table.get_attribute('outerHTML'), 'html.parser')

rows = soup.find_all("tv-data-table__row tv-data-table__stroke tv-screener-table__result-row")
print(rows)
#csv

with open('Webscraping/webscraping.csv', 'w', newline='', encoding='utf8') as f:
    thewriter = writer(f)
    header = ['Company', 'Market Cap']
    thewriter.writerow(header)

    print("123")
    
    for row in rows:
        #name = row.find("a", class_="tv-screener__symbol apply-common-tooltip").text.get('title').strip()

        name_element = row.find("a", class_="tv-screener__symbol apply-common-tooltip")
        print("hi")
        if name_element:
            name = name_element.get('title').strip()
            print(name)
            print(name_element.get("data-symbol"))
            print("hello")
            # Continue with the rest of the code
        else:
            print("Element not found")        
        
        cap = row.find("a", class_="tv-data-table__cell tv-screener-table__cell tv-screener-table__cell--with-marker").text()
        thewriter.writerow([name, cap])
        print(name)
          

driver.quit()