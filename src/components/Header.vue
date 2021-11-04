<template>
  <header style="margin-bottom: 25px">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container-fluid">
        <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse row justify-content-center" id="navbarExample01">
          <ul class="navbar-nav row justify-content-center" style="width: 100%">
            <li class="nav-item active" style="width: 90px">
              <a class="nav-link" aria-current="page"  @click="$router.push('/')">Главная</a>
            </li>
            <li class="nav-item" style="width: 200px">
              <a class="nav-link" @click="$router.push('/articleCreate')">Добавить новость</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>

</style>