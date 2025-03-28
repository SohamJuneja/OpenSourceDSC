from flask import Flask, render_template
from secure_banking_system import BankingSystem
import io
import sys
from datetime import datetime
import os

# Create Flask app with explicit template directory
template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'templates'))
app = Flask(__name__, template_folder=template_dir)

def capture_output(func):
    # Capture console output
    old_stdout = sys.stdout
    new_stdout = io.StringIO()
    sys.stdout = new_stdout
    
    # Run the function
    func()
    
    # Get the output
    output = new_stdout.getvalue()
    
    # Restore stdout
    sys.stdout = old_stdout
    
    return output

@app.route('/')
def index():
    # Run the banking test and capture output
    test_output = capture_output(lambda: BankingSystem().test_banking())
    
    # Get current time
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    return render_template('index.html', 
                         test_output=test_output,
                         current_time=current_time)

if __name__ == '__main__':
    app.run(debug=True) 