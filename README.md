# POWERPACK

TODO

Auth
- Create admin initial user when application is start up.

DB

[ ] User table (adopted from )
  - id
  - role (admin/coordinator)
  - username
  - password
  - created_at
  - updated_at
[ ] Product table
  - id
  - name
  - unit_price
  - category
  - is_pp (indicates if product can be purchased as a power pack or defined quantity)
  - pp_qty (1 if is_power_pack == false)
  - pp_price (same as unit_price if is_power_pack == false)
  - visible (true by default, set to default when price is updated)
  - created_at
  - updated_at
[ ] Inventory table
  - id
  - product_id
  - quantity
  - last_updated
