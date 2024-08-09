import zipfile
import sys

def zip_file(source_file, output_zip):
    with zipfile.ZipFile(output_zip, 'w') as zipf:
        zipf.write(source_file, arcname=source_file)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python zipper.py <source_file> <output_zip>")
        sys.exit(1)

    source_file = sys.argv[1]
    output_zip = sys.argv[2]

    zip_file(source_file, output_zip)