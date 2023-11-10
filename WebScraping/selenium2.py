from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from csv import writer
from bs4 import BeautifulSoup
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By

driver = Chrome()
driver.get("https://www.tradingview.com/screener")
driver.implicitly_wait(15)


rows = driver.find_elements(By.XPATH, '//*[@id="js-screener-container"]/div[4]/table/tbody/tr[1]')

#csv
with open('Webscraping/webscraping.csv', 'w', newline='', encoding='utf8') as f:
    thewriter = writer(f)
    header = ['Company', 'Market Cap']
    thewriter.writerow(header)

    
    for row in rows:

        name_element = row.find_element(By.XPATH, '//*[@id="js-screener-container"]/div[4]/table/tbody/tr[1]/td[1]/div/div[2]/span[2]')

        if name_element:
            name = name_element.text.strip()
            print(name)

            # Continue with the rest of the code
        else:
            print("Element not found")        
        
        cap = row.find_element(By.XPATH, '//*[@id="js-screener-container"]/div[4]/table/tbody/tr[1]/td[8]').text.strip()
        thewriter.writerow([name, cap])
        print(cap)
          

driver.quit()