"""Add supervisor_id to task

Revision ID: 740392f1b9e1
Revises: 4853454db2c9
Create Date: 2024-07-11 13:26:58.965068

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '740392f1b9e1'
down_revision = '4853454db2c9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.add_column(sa.Column('supervisor_id', sa.Integer(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.drop_column('supervisor_id')

    # ### end Alembic commands ###