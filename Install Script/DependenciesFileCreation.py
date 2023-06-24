import os
import json

# Function to prompt the user for input
def prompt_user(question):
    return input(question)

# Function to change directory
def change_directory():
    script_dir = os.path.dirname(os.path.realpath(__file__))
    parent_dir = os.path.abspath(os.path.join(script_dir, os.pardir))
    grandparent_dir = os.path.abspath(os.path.join(parent_dir, os.pardir))
    os.chdir(grandparent_dir)

# Get the current working directory
current_working_directory = os.getcwd()

# Print the current working directory
print(current_working_directory)

# Run command to install dependencies
npm_install_command = "npm install"
os.system(npm_install_command)

# Call the change_directory() function to change the current working directory
change_directory()

# Get the current working directory
current_working_directory = os.getcwd()

# Print the current working directory
print(current_working_directory)

# Edit and rename template-config.json
template_config_filename = 'template-config.json'
config_filename = 'config.json'

# Edit template-config.json
with open(template_config_filename, 'r') as template_file:
    template_data = json.load(template_file)

template_data['token'] = prompt_user('Enter your Discord bot token: ')
template_data['clientId'] = prompt_user('Enter your application\'s client ID: ')
template_data['guildId'] = prompt_user('Enter your server ID: ')
template_data['WolfAPI'] = prompt_user('Enter your Wolfram API key or just press enter to skip: ')

with open(config_filename, 'w') as config_file:
    json.dump(template_data, config_file, indent=2)

# Edit template.env
template_env_filename = 'template.env'
env_filename = '.env'

user_entry = prompt_user('Enter your OpenAI API key or just press enter to skip: ')

with open(template_env_filename, 'r') as template_env_file:
    template_env_data = template_env_file.read()

template_env_data = template_env_data.replace('"USER ENTRY HERE"', user_entry)

with open(env_filename, 'w') as env_file:
    env_file.write(template_env_data)

# Delete template files
os.remove(template_config_filename)
os.remove(template_env_filename)

# Call the change_directory() function to change the current working directory
change_directory()

# Delete the install.bat file
installScript = 'install.bat'
os.remove(installScript)

# Define the file path
file_path = os.path.expanduser("~/Documents/CTBSCL.txt")

# Call the delete_file() function to delete the file
os.remove(file_path)