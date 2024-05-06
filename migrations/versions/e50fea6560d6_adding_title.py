"""adding title

Revision ID: e50fea6560d6
Revises: f3151fe4ef92
Create Date: 2024-05-06 19:14:09.388158

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e50fea6560d6'
down_revision = 'f3151fe4ef92'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('standard', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.String(), nullable=True))
        batch_op.drop_column('puzzle_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('standard', schema=None) as batch_op:
        batch_op.add_column(sa.Column('puzzle_id', sa.INTEGER(), nullable=True))
        batch_op.drop_column('title')

    # ### end Alembic commands ###