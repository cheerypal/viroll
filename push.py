import subprocess as cmd
import sys
import os

# Created to improve pushing to heroku and the github repo


def main():

    lint = False
    heroku = False
    commit = False

    # Get and check for arguments

    for i in range(len(sys.argv)):

        if sys.argv[i] == "-l" or sys.argv[i] == "lint":
            lint = True

        if sys.argv[i] == "-h" or sys.argv[i] == "heroku":
            heroku = True

    # Commit msg for git
    commitMsg = input("Type your commit msg here:\n")

    # Check if their is a request to lint or push to heroku
    if lint == True or heroku == True:
        os.chdir(os.path.abspath("C:/Users/euang/Documents/viroll/frontend"))
        if lint == True:
            cp = cmd.run("npm run lint", check=True, shell=True)
            print(cp)
        if heroku == True:
            cp = cmd.run('npm run build', check=True, shell=True)
            print(cp)

    # Push to GitHub
    os.chdir(os.path.abspath("C:/Users/euang/Documents/viroll"))
    cp = cmd.run("git add .", check=True, shell=True)
    print(cp)
    cp = cmd.run(f"git commit -m {commitMsg}", check=True, shell=True)
    print(cp)
    cp = cmd.run("git push", check=True, shell=True)
    print(cp)

    # Push to heroku if requested
    if heroku == True:
        cp = cmd.run(
            "git subtree --prefix frontend push heroku master", check=True, shell=True)
        print(cp)


if __name__ == '__main__':
    main()
