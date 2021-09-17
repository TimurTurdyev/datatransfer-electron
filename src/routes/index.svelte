<script>
    import {onMount} from "svelte";
	import {goto} from "$app/navigation";

	// Check form
    onMount(() => {
		document.querySelector('form').addEventListener('submit', async e => {
			e.preventDefault();

			const result = await window.api.invoke('login', formData);
			if (result) {
				goto('/main').catch(e => console.log('fuck!'));
            } else {
				alert('Неверный логин или пароль');
            }
        });
    });

	// Form data
    const formData = {
		login: '',
        password: ''
    }
</script>

<main class="d-flex align-items-center justify-content-center w-100">
    <div class="card">
        <form class="card-body p-5">
            <h5 class="card-title">Вход в систему</h5>
            <div class="mb-3">
                <label for="login" class="form-label">Email</label>
                <input type="email" class="form-control" id="login" aria-describedby="emailHelp" bind:value={formData.login}>
                <div id="emailHelp" class="form-text">Введите Ваш логин в системе WAVIoT</div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Email</label>
                <input type="password" class="form-control" id="password" bind:value={formData.password}>
            </div>
            <button type="submit" class="btn btn-primary">Войти</button>
        </form>
    </div>
</main>

<style>
    main {
        height: 100vh;
        background: #1b1b26;
    }
</style>