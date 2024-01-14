# E-business
# Project

## For Database
- Install MAMP and Start
- Go to PHPMyAdmin
  - Add user [here](http://localhost/phpMyAdmin/index.php?route=/server/privileges&adduser=1)
    - Username: `moviesnow`
    - Password: `movie_Password1`
    - Check "Create database with same name and grant all privileges."
  - The last step should have created a database named "moviesnow" but if not...
    - [Create Database](http://localhost/phpMyAdmin/index.php?route=/server/databases&server=1), name it "moviesnow"
    - [Add User to Database](http://localhost/phpMyAdmin/index.php?route=/server/privileges&adduser=1&dbname=moviesnow), Username: `moviesnow`
    - [Edit privledges on moviesnow](http://localhost/phpMyAdmin/index.php?route=/server/privileges&username=moviesnow&hostname=%25&dbname=moviesnow&tablename=&routinename=)
      - Click the checkbox next to "Data" then click "Go"

### To Import Data
- If you need to re-import data, you will need to drop the database and recreate it again
  - [Operations page](http://localhost/phpMyAdmin/index.php?route=/database/operations&db=moviesnow)
    - Click "Drop the database (DROP)"
    - Confirm prompt
  - Recreate database (instructions above)
- Use the `database/moviesnow.sql` file
- [Import Data Page](http://localhost/phpMyAdmin/index.php?route=/database/import&db=moviesnow)
- Select the `database/moviesnow.sql` file
- Click "Go"

### To Export Data
- Go to [Export Page](http://localhost/phpMyAdmin/index.php?route=/database/export&db=moviesnow)
- Select "Custom"
- Scroll down and click "Go" in the very bottom right
- Replace `database/moviesnow.sql` with downloaded file

## For Backend
- Install Python [here](https://apps.microsoft.com/store/detail/python-311/9NRWMJP3717K?hl=en-us&gl=us)
- `cd backend`
- `pip install -r requirements.txt`
- To run the backend: `python index.py`

## For Frontend (if you want)
- Install NodeJS [here](https://nodejs.org/en) (install LTS version)
- Install PNPM [here](https://pnpm.io/installation)
- `cd frontend`
- `pnpm install`
- To run the frontend: `pnpm dev`
