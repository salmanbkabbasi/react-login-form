import { Link, useLocation } from 'react-router-dom';
import { Flex, Input } from 'antd';

export default function Navbar() {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{marginLeft: "10px"}}>
  <a class="navbar-brand" href="#" style={{marginRight: "40px"}}>SELAYE</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="#">HomeForm <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="#" style={{ marginLeft: "20px"}}>Users</Link>
      </li>
          <Input.Search placeholder="Filled" variant="filled" style={{marginLeft: "40px"}} />
    </ul>
  </div>
</nav>
    </>
  )
}
