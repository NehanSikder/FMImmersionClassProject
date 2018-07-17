import unittest
import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class MortgageCalculatTestSuite(unittest.TestCase):
	
	def setUp(self):
		dir_path = os.path.dirname(os.path.realpath(__file__))
		chromedriver = dir_path+"/chromedriver"
		os.environ["webdriver.chrome.driver"] = chromedriver
		self.port = "8000"
		self.driver = webdriver.Chrome(chromedriver)
		self.driver.get("http://localhost:"+self.port)
		self.principalInput = self.driver.find_element_by_id("principalAmount")
		self.interestRateInput = self.driver.find_element_by_id("rateAmount")
		self.yearsInput = self.driver.find_element_by_id("numberOfYears")
		self.outputDiv = self.driver.find_element_by_class_name("output-container")
		self.calculateButton = self.driver.find_element_by_name("btn")


	def test_navigating_to_site(self):
		self.assertIn("Mortgage Calculator", self.driver.title)

	def test_calculator_function(self):
		self.principalInput.send_keys("300000")
		self.interestRateInput.send_keys("3.9")
		self.yearsInput.send_keys("30")
		self.calculateButton.click()
		assert "1415.00" in self.outputDiv.text
		assert "209401.66" in self.outputDiv.text
		assert "509401.66" in self.outputDiv.text

	def test_selecting_calculate_with_no_input(self):
		self.calculateButton.click()
		alert = self.driver.switch_to.alert
		self.assertEqual(alert.text, "User needs to input the principal amount")

	def test_selecting_calculate_with_only_principal_input(self):
		self.principalInput.send_keys("300000")
		self.calculateButton.click()
		alert = self.driver.switch_to.alert
		self.assertEqual(alert.text, "User needs to input the intrest rate amount and interest rate cannot be 0")

	def test_selecting_calculate_with_only_interest_input(self):
		self.interestRateInput.send_keys("3.9")
		self.calculateButton.click()
		alert = self.driver.switch_to.alert
		self.assertEqual(alert.text, "User needs to input the principal amount")

	def test_selecting_calculate_with_only_years_input(self):
		self.yearsInput.send_keys("30")
		self.calculateButton.click()
		alert = self.driver.switch_to.alert
		self.assertEqual(alert.text, "User needs to input the principal amount")

	def test_selecting_calculate_with_principal_and_years_input(self):
		self.principalInput.send_keys("300000")
		self.yearsInput.send_keys("30")
		self.calculateButton.click()
		alert = self.driver.switch_to.alert
		self.assertEqual(alert.text, "User needs to input the intrest rate amount and interest rate cannot be 0")

	def test_selecting_calculate_with_principal_and_interest_input(self):
		self.principalInput.send_keys("300000")
		self.interestRateInput.send_keys("3.9")
		self.calculateButton.click()
		alert = self.driver.switch_to.alert
		self.assertEqual(alert.text, "User needs to input the number of years")

	def test_selecting_calculate_with_years_and_interest_input(self):
		self.yearsInput.send_keys("30")
		self.interestRateInput.send_keys("3.9")
		self.calculateButton.click()
		alert = self.driver.switch_to.alert
		self.assertEqual(alert.text, "User needs to input the principal amount")

	def test_interest_rate_greater_than_100(self):
		self.principalInput.send_keys("300000")
		self.interestRateInput.send_keys("101")
		self.yearsInput.send_keys("30")
		self.calculateButton.click()
		alert = self.driver.switch_to.alert
		self.assertEqual(alert.text, "Interest rate cannot be less than 0 or greater than 100")

	def test_interest_rate_less_than_0(self):
		self.principalInput.send_keys("300000")
		self.interestRateInput.send_keys("-1")
		self.yearsInput.send_keys("30")
		self.calculateButton.click()
		alert = self.driver.switch_to.alert
		self.assertEqual(alert.text, "Interest rate cannot be less than 0 or greater than 100")



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
