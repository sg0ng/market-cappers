import requests
from bs4 import BeautifulSoup
from csv import writer

page = requests.get("https://www.tradingview.com/screener/?aff_id=4191")
if page.status_code == 200:
    
    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find_all('tr', {"tbody": "tv-data-table__tbody"})
    print(results)

    with open('companies.csv', 'w', newline='', encoding = 'utf8') as f:
        thewriter = writer(f)
        header = ['Ticker', 'Company', 'Cap']
        thewriter.writerow(header)
        for result in results:
            print(result)
            results1 = result.find_all('tr', {"class": "tv-data-table__row tv-data-table__stroke tv-screener-table__result-row"})

            for result1 in results1:
                ticker = result.find('a', class_='tv-screener__symbol apply-common-tooltip').text.strip()
                company = result.find('span', class_='tv-screener__description').text.strip()
                cap = result.find('td', class_='tv-data-table__cell tv-screener-table__cell tv-screener-table__cell--with-marker').text.strip()
                info = [ticker, company, cap]
                thewriter.writerow(info)
