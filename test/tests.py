import unittest
import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class MortgageCalculatTestSuite(unittest.TestCase):
	
	def setUp(self):
		dir_path = os.path.dirname(os.path.realpath(__file__))
		chromedriver = dir_path+"/chromedriver"
		os.environ["webdriver.chrome.driver"] = chromedriver
		self.driver = webdriver.Chrome(chromedriver)

	def test_navigating_to_site(self):
		driver = self.driver
		driver.get("http://localhost:8000/")
		self.assertIn("Mortgage Calculator", driver.title)
        # elem = driver.find_element_by_name("q")
        # elem.send_keys("pycon")
        # elem.send_keys(Keys.RETURN)
        # assert "No results found." not in driver.page_source


	def tearDown(self):
		self.driver.close()

if __name__ == "__main__":
	unittest.main()



# dir_path = os.path.dirname(os.path.realpath(__file__))
# chromedriver = dir_path+"/chromedriver"
# os.environ["webdriver.chrome.driver"] = chromedriver
# driver = webdriver.Chrome(chromedriver)
# driver.get("http://www.python.org")
# assert "x" in driver.title
# elem = driver.find_element_by_name("q")
# elem.clear()
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source
# driver.close()