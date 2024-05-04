"""again

Revision ID: f3151fe4ef92
Revises: 76d78c257363
Create Date: 2024-05-04 19:07:20.677519

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f3151fe4ef92'
down_revision = '76d78c257363'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sudoku_puzzle', schema=None) as batch_op:
        batch_op.add_column(sa.Column('size', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('standard', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sudoku_puzzle', schema=None) as batch_op:
        batch_op.drop_column('standard')
        batch_op.drop_column('size')

    # ### end Alembic commands ###