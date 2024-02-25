import sys

def format_code(input_code):
    lines = input_code.split('\n')
    formatted_code = '\n'.join('"' + line.strip() + '" +\\n' for line in lines)
    return formatted_code

def process_html_file(file_path, output_file_path):
    try:
        # Read the HTML file
        with open(file_path, 'r', encoding='utf-8') as file:
            html_code = file.read()

        # Format the HTML code
        formatted_html_code = format_code(html_code)

        # Write the result to the output file
        with open(output_file_path, 'w', encoding='utf-8') as output_file:
            output_file.write(formatted_html_code)

        print(f"Formatted HTML code saved to {output_file_path}")

    except Exception as e:
        print(f"Error processing the HTML file: {str(e)}")

if __name__ == "__main__":
    # Check if two arguments are provided in command line arguments
    if len(sys.argv) != 3:
        print("Usage: python script_name.py <html_file_path> <output_file_path>")
        sys.exit(1)

    # Get the HTML file path and output file path from command line arguments
    html_file_path = sys.argv[1]
    output_file_path = sys.argv[2]

    # Call the function to process the HTML file and save the output
    process_html_file(html_file_path, output_file_path)
