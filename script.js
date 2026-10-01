/* ==========================================================================
   CONFIGURAÇÕES INTERATIVAS DA POTAMASK
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ANIMAÇÃO DO CABEÇALHO AO ROLAR A PÁGINA (SCROLL)
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8)';
            header.style.backgroundColor = '#050608'; // Fundo levemente mais escuro
            header.style.padding = '15px 10%'; // Diminui o tamanho do menu sutilmente
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(11, 12, 16, 0.95)';
            header.style.padding = '20px 10%';
        }
    });

    // 2. INTERCEPTAÇÃO E VALIDAÇÃO DO FORMULÁRIO DE CONTATO
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', (event) => {
            // Impede o recarregamento padrão da página ao enviar o formulário
            event.preventDefault();
            
            // Captura os dados preenchidos pelo cliente
            const nome = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('phone').value;
            const interesse = document.getElementById('interest').options[document.getElementById('interest').selectedIndex].text;
            
            // Aqui você conectaria com sua API de e-mail ou CRM futuramente.
            // Para a experiência do usuário, vamos simular o sucesso:
            exibirMensagemSucesso(nome, interesse);
            
            // Limpa os campos do formulário após o envio
            form.reset();
        });
    }

    // Função interna para criar o alerta de sucesso estilizado na tela
    function exibirMensagemSucesso(cliente, maquina) {
        // Remove qualquer mensagem anterior caso exista
        const mensagemAntiga = document.querySelector('.alert-success');
        if (mensagemAntiga) mensagemAntiga.remove();

        // Cria o elemento da mensagem de sucesso
        const alertBox = document.createElement('div');
        alertBox.className = 'alert-success';
        alertBox.innerHTML = `
            <h3>Obrigado, ${cliente}! 🚀</h3>
            <p>Sua solicitação para a máquina <strong>${maquina}</strong> foi recebida.</p>
            <p>Um consultor especialista da Potamask entrará em contato em até 1 hora.</p>
        `;

        // Estilização dinâmica da mensagem (combinando com o CSS do site)
        Object.assign(alertBox.style, {
            backgroundColor: '#1f2833',
            border: '2px solid #ffc107',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '20px',
            textAlign: 'center',
            boxShadow: '0 5px 15px rgba(255, 193, 7, 0.2)',
            animation: 'fadeIn 0.5s ease'
        });

        // Adiciona a mensagem logo após o formulário
        form.appendChild(alertBox);

        // Remove a mensagem automaticamente após 8 segundos
        setTimeout(() => {
            alertBox.style.opacity = '0';
            alertBox.style.transition = 'opacity 1s ease';
            setTimeout(() => alertBox.remove(), 1000);
        }, 8000);
    }

    // 3. ROLAGEM SUAVE EXCLUSIVA PARA OS LINKS INTERNOS
    const linksInternos = document.querySelectorAll('nav a, .cta-header a, .hero-buttons a');
    
    linksInternos.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            
            // Verifica se o link é uma âncora interna (começa com #)
            if (href.startsWith('#')) {
                event.preventDefault();
                const secaoAlvo = document.querySelector(href);
                
                if (secaoAlvo) {
                    // Calcula a altura do header para não cobrir o título da seção
                    const topoHeader = header.offsetHeight;
                    const posicaoAlvo = secaoAlvo.getBoundingClientRect().top + window.scrollY - topoHeader;
                    
                    window.scrollTo({
                        top: posicaoAlvo,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
