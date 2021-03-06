"""complaint table

Revision ID: 3ed5a7caf729
Revises: 
Create Date: 2020-05-27 20:21:20.250552

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3ed5a7caf729'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('complaint', sa.Column('response_details', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('complaint', 'response_details')
    # ### end Alembic commands ###
