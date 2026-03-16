document.addEventListener("DOMContentLoaded", () => {

    //script do menu
    const profileIcon = document.getElementById('profileIcon');
    const profileMenu = document.getElementById('profileMenu');

    profileIcon.addEventListener('click', function() {
      profileMenu.classList.toggle('show');
    });

    window.onclick = function(event) {
      if (!event.target.matches('#profileIcon') && !event.target.closest('.profile-menu')) {
        if (profileMenu.classList.contains('show')) {
          profileMenu.classList.remove('show');
        }
      }
    }

  const buttons = document.querySelectorAll(".toggle-details");
  const tbody = document.querySelector("#lista-relatorios");

  const rodapePaginacao = document.querySelector(".rodape-paginacao");
  const rodapeVoltar = document.querySelector(".rodape-voltar");

  function mostrarLista() {
    // Fecha tudo corretamente
    document.querySelectorAll(".linha-detalhes.ativo")
      .forEach(el => el.classList.remove("ativo"));

    document.querySelectorAll(".linha-principal.linha-ativa")
      .forEach(el => el.classList.remove("linha-ativa"));

    tbody.classList.remove("detalhe-ativo");

    rodapePaginacao.style.display = "flex";
    rodapeVoltar.style.display = "none";
  }

  function mostrarDetalhes(linhaPrincipal, currentDetail) {

    // Fecha qualquer outra linha aberta
    document.querySelectorAll(".linha-detalhes.ativo")
      .forEach(el => el.classList.remove("ativo"));

    document.querySelectorAll(".linha-principal.linha-ativa")
      .forEach(el => el.classList.remove("linha-ativa"));

    // Abre a clicada
    linhaPrincipal.classList.add("linha-ativa");
    currentDetail.classList.add("ativo");
    tbody.classList.add("detalhe-ativo");

    rodapePaginacao.style.display = "none";
    rodapeVoltar.style.display = "flex";
  }

  // Botão voltar
  rodapeVoltar.addEventListener("click", () => {
    mostrarLista();
  });

  // Clique nos botões de status
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const linhaPrincipal = this.closest("tr");
      const currentDetail = linhaPrincipal.nextElementSibling;

      const isOpen = currentDetail.classList.contains("ativo");

      if (isOpen) {
        mostrarLista();
      } else {
        mostrarDetalhes(linhaPrincipal, currentDetail);
      }
    });
  });

  // Estado inicial
  mostrarLista();
});
