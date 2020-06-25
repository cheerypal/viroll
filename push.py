import subprocess as cmd
import sys, os

#initialise on powershell

def main ():

    lint = False
    heroku = False

    for i in range(len(sys.argv)):
        if sys.argv[i] == "-l" or sys.argv[i] == "lint" :
            lint = True
            
        if sys.argv[i] == "-h" or sys.argv[i] == "heroku":
            heroku = True

    commitMsg = input("Type your commit msg here:\n")

    if lint == True or heroku == True:
        os.system("cd frontend")
        
        if lint == True:
           cp = cmd.run("npm run lint", check=True, shell=True)
           print(cp)
        if heroku == True:
           cp = cmd.run('npm run build', check=True, shell=True)
           print(cp)

    cp = cmd.run("git add .", check=True, shell=True)
    print(cp)
    cp = cmd.run(f"git commit -m '{commitMsg}'", check=True, shell=True)
    print(cp)
    cp = cmd.run("git push", check=True, shell=True)
    print(cp)

    if heroku == True:
        cp = cmd.run("git subtree --prefix frontend push heroku master" , check=True, shell=True)
        print(cp)


if __name__ == '__main__':
    main()
