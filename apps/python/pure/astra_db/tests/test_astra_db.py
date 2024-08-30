import unittest
from db import AstraDB

class TestAstraDB(unittest.TestCase):
    def setUp(self):
        self.db = AstraDB()

    def test_list_collections(self):
        collections = self.db.list_collections()
        self.assertIsInstance(collections, list)
    
    # Add more tests for other methods

    def tearDown(self):
        self.db.close_connection()

if __name__ == "__main__":
    unittest.main()
