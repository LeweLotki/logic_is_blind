"""Initial migration

Revision ID: b798904b7d59
Revises: 
Create Date: 2024-04-26 22:21:45.365990

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b798904b7d59'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sudoku_puzzle', schema=None) as batch_op:
        batch_op.add_column(sa.Column('logic_master_url', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('difficulty', sa.String(), nullable=True))
        batch_op.create_index(batch_op.f('ix_sudoku_puzzle_title'), ['title'], unique=False)
        batch_op.create_unique_constraint('uq_logic_master', ['logic_master_url'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sudoku_puzzle', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_index(batch_op.f('ix_sudoku_puzzle_title'))
        batch_op.drop_column('difficulty')
        batch_op.drop_column('logic_master_url')

    # ### end Alembic commands ###
