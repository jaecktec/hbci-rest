# hbci-rest

Rest - wrapper for the <a href="https://github.com/jschyma/open_fints_js_client"> Open Fints Js Client </a>

[GET] http://[host]:[port]/bank/:blz 
Params: 
<table>
<thead><tr><th>Param</th><th>Description</th></tr></thead>
<tbody>
  <tr><td>blz</td><td>Bank number</td></tr>
</tbody>
</table>
Returns:
<pre>
{
  "blz": Bank number,
  "name": Bank name,
  "city": Bank City,
  "bic": BIC number
}</pre>

[GET] http://[host]:[port]/account
<table>
<thead><tr><th>Param</th><th>Description</th></tr></thead>
<tbody>
  <tr><td>blz</td><td>Bank number</td></tr>
  <tr><td>legId</td><td>legitimation ID</td></tr>
  <tr><td>pin</td><td>corresponding password</td></tr>
</tbody></table>
Returns:
<pre>
[
  {
    "iban": IBAN,
    "konto_nr": Account number [String],
    "unter_konto_merkm": ??,
    "ctry_code": Country code [String],
    "blz": Bank Number [String],
    "kunden_id": Customer Number [String],
    "kontoart": "" [String],
    "currency": Currency [String],
    "kunde1_name": Customer lastname  [String],
    "product_name": Product name  [String],
    "unter_konto": ??  [String],
    "kontoar": ??  [String],
    "sepa_data": {
      "is_sepa": If the Account is a SEPA Account [Boolean],
      "iban":  iban (again)  [String],
      "bic": bic  [String],
      "konto_nr": Account number (again :D)  [String],
      "unter_konto": ??  [String],
      "ctry_code": Country code (again -.-) [String],
      "blz": Bank Number (again ...) [String]
    }
  }
]

</pre>

[GET] http://[host]:[port]/account/transactions
<thead><tr><th>Param</th><th>Description</th></tr></thead>
<tbody>
    <tr><td>blz</td><td>Bank number</td></tr>
  <tr><td>legId</td><td>legitimation ID</td></tr>
  <tr><td>pin</td><td>corresponding password</td></tr>
  <tr><td>fromDate<small>(optional)</small></td><td>date (ms)min date of transaction</td></tr>
  <tr><td>toDate<small>(optional)</small></td><td>>date (ms) max date of transaction</td></tr>
</tbody>
Returns:
