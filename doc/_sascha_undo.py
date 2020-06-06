import os
import os.path

FILETYPES = ["tex"]

def getFilepaths():
    files = []
    for dirpath, dirnames, filenames in os.walk("."):
        for filename in [f for f in filenames if shouldIncludeFile(f)]:
            files.append(os.path.join(dirpath, filename))
    return files

def shouldIncludeFile(filename):
    for filetype in FILETYPES:
        if (filename.lower().endswith("."+filetype.lower())):
            return True
    return False

def removeSaschasSpaces(filepath):
    f = open(filepath, "r")
    content = f.read().splitlines()
    f.close()

    counter = 0
    f = open(filepath, "w")
    for line in content:
        newline = line.rstrip()
        if (newline != line): counter += 1
        f.write(newline + "\n")
    f.close()

    return counter

def main():
    count = 0
    for filepath in getFilepaths():
        cur = removeSaschasSpaces(filepath)
        print(filepath, cur)
        count += cur
    print("Found", count, "lines in total where Sascha made a mistake...")

if __name__ == "__main__":
    main()

