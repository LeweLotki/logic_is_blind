"""Adjustments to puzzle_solve table

Revision ID: 81fcef787617
Revises: b798904b7d59
Create Date: 2024-05-04 17:59:57.513649

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '81fcef787617'
down_revision = 'b798904b7d59'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('puzzle_solve', schema=None) as batch_op:
        # If a unique constraint was named, it needs to be dropped by name. Otherwise, general removal.
        # Attempt to remove the constraint if it exists. This may need to be adjusted based on actual DB schema.
        batch_op.drop_constraint('uq_puzzle_solve_user_id', type_='unique')  # Adjust the constraint name as necessary
        batch_op.alter_column('user_id',
               existing_type=sa.VARCHAR(length=36),
               type_=sa.String(length=36),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('puzzle_solve', schema=None) as batch_op:
        # If you want to revert, you need to add the unique constraint back during downgrade.
        batch_op.create_unique_constraint('uq_puzzle_solve_user_id', ['user_id'])
        batch_op.alter_column('user_id',
               existing_type=sa.String(length=36),
               type_=sa.VARCHAR(length=36),
               existing_nullable=True)
    # ### end Alembic commands ###
