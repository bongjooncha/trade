DB="local"
import sys
import os
from dotenv import load_dotenv
load_dotenv()
print(os.getenv('file_location'))
sys.path.append(os.getenv('file_location'))