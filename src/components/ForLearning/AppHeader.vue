<template>
  <header class="site-header" id="site-header">
    <div class="container">
      <div class="header-top justify-content-between align-items-center py-1">
        <router-link to="/" class="logo-link">
          <img src="@/assets/img/logo-forlearning.png" alt="CalendarForGood">
        </router-link>
        <div class="header-top__nav-section">
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <router-link to="/register" class="nav-link px-1">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link px-1 pr-0">Login</router-link>
            </li>
          </ul>
          <ul class="nav social-nav justify-content-end">
            <li class="nav-item">
              <a href="#" class="nav-link bg-facebook">
                <i class="fab fa-facebook-f"></i>
                <span class="sr-only">Facebook</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link bg-twitter">
                <i class="fab fa-twitter"></i>
                <span class="sr-only">Twitter</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link bg-instagram">
                <i class="fab fa-instagram"></i>
                <span class="sr-only">Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header-nav bg-primary">
      <nav class="navbar py-0">
        <div class="container">
          <div class="navbar__content" id="navbar-content">
            <ul class="navbar__nav w-100">
              <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">About Us</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">Volunteer</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">Nonprofits</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">Contact Us</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">Donate</router-link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style lang="scss">
  .logo-link {
    img {
      max-width: 300px;
    }
  }

  .header-top {
    display: flex;

    .header-top__nav-section {
      @include breakpoint($mobile) {
        display: none;
      }

      .nav-link {
        font-size: .875em;
      }
    }
  }

  .header-nav { 
    @include breakpoint($mobile) {
      display: none;
    }
  }
 
  .navbar {
    background-color: transparent !important;
    display: flex !important;
  }

  .navbar__content {
    width: 100%;
  }

  .navbar__nav {
    display: flex;
    margin-bottom: 0;
    width: 100%;

    .nav-item{
      .nav-link {
        font-size: 14px;
        color: #fff;
        padding: 1.25rem !important;

        &:hover {
          color: $secondary;
        }
      }

      &:last-child {
        margin-left: auto;
        background-color: $secondary;

        .nav-link {
          font-size: 1em;
          padding: 1.25rem 1.5rem !important;
          font-weight: 700;
          letter-spacing: .4px;
          color: #fff !important;
          text-transform: uppercase;
        }
      }
    }
  }
</style>
