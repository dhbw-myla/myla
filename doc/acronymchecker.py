f = open("acronyms.tex", encoding="utf-8")
fileContent = f.read().splitlines()
f.close()

acronyms = []
for line in fileContent:
    if("\\acro{" in line):
        acronyms.append(line.split("\\acro{")[1].split("}")[0])

errorFound = False
for i in range(len(acronyms)-1):
    if(acronyms[i] > acronyms[i+1]):
        print("acronyms not in alphabetical order:",
              acronyms[i],
              acronyms[i+1])
        errorFound = True

if(not errorFound):
    print("hey... everything fine!")

# keep alive if in terminal/cmd
import sys
import time
if("idlelib" not in sys.modules):
    if(errorFound):
        input()
    else:
        time.sleep(3)
