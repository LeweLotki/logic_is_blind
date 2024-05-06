import requests
from urllib.parse import urlencode

from app.models import db
from app.models.puzzles import TablePuzzle
from app.models.standard import TableStandard

from sqlalchemy import func


class Collector:

    base_url = 'https://sudoku-api.vercel.app/api/dosuku'
    query = '{newboard(limit:1){grids{value, solution, difficulty}}}'
    encoded_query = urlencode({'query': query})
    full_url = f"{base_url}?{encoded_query}"

    def __init__(self):

        self.__collect()

    def __collect(self):

        fetched_data = self.__fetch_sudoku_grids()
        data = self.__preper_data(fetched_data)
        self.__commit_collected_data(data)
        self.__display_sudoku_grids(data)

    def __fetch_sudoku_grids(self):
        response = requests.get(self.full_url)
        if response.status_code == 200:
            return response.json()
        else:
            print("Failed to fetch data:", response)
            print("Response Text:", response.text)  
            return None

    def __preper_data(self, fetched_data: dict) -> dict:

        if not fetched_data:
            return None

        grid = fetched_data['newboard']['grids'][0]['value']
        solution = fetched_data['newboard']['grids'][0]['solution']
        difficulty = fetched_data['newboard']['grids'][0]['difficulty']

        count = db.session.query(func.count(TablePuzzle.id)).scalar()
        title = f'Sudoku #{count}'

        data = {
            'grid': grid,
            'solution': solution,
            'difficulty': difficulty,
            'title': title
        }

        return data

    def __display_sudoku_grids(self, data: dict) -> None:

        if data:
            print('Sudoku: \n')
            for row in data['grid']:
                print(row)
            print('\nSolution: \n')
            for row in data['solution']:
                print(row)
            print(f'\ndifficulty: {data["difficulty"]}\n')
        else:
            print("Failed to fetch data from API or empty data returned.")

    def __commit_collected_data(self, data: dict) -> None:
        '''
        This method commits collected data to db if not defective.
        Return True if data complete, return False if data defective.
        '''

        new_puzzle = TablePuzzle(
            puzzle_image='',
            logic_master_url='',
            sudoku_pad_ref='',
            solution_code='',
            cells={},
            rules='',
            title=data['title'],
            author='',
            difficulty=data['difficulty'],
            standard=True,
            size=9
        )
        db.session.add(new_puzzle)
        
        new_puzzle = TableStandard(
            title=data['title'],
            grid=data['grid'],
            solution=data['solution']
        )
        db.session.add(new_puzzle)
        
        db.session.commit()



        

