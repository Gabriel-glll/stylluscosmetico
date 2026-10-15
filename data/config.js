// Dados da loja — edite aqui
window.LOJA = {
  nome: "Styllu's Cosméticos",
  whatsapp: "5519981469449",
  telefone: "(19) 98146-9449",
  instagram: "https://www.instagram.com/stylluscosmetico/",
  endereco: "Rua Rozendo Alves de Souza, 832 — ao lado do Savegnago Bom Retiro, Sumaré/SP",
  mapa: "https://www.google.com/maps?q=Rua+Rozendo+Alves+de+Souza,+832,+Sumar%C3%A9+SP&output=embed",
  // ⚠️ Conferir: só se sabe que fecha às 18h (Bing). Confirmar abertura, sábado e domingo.
  horarios: [
    ["Segunda a sexta", "até 18h"],
    ["Sábado", "⚠️ conferir"]
  ]
};

// Categorias do menu (ordem de exibição)
window.CATEGORIAS = ["Cabelos", "Corpo e banho", "Lábios", "Unhas"];

// Produtos (tirados dos posts do Instagram). Sem "preco" = botão "Consultar" e o pedido vai sem valor.
// Para mostrar preço, adicione  preco: 39.9  no item.
// ⚠️ Conferir com a loja quais itens estão em estoque e se quer mostrar preços.
window.PRODUTOS = [
  { nome: "Kit Tratamento Mandioca", marca: "Eico", cat: "Cabelos", img: "img/mandioca.jpg", desc: "Shampoo + spray + máscara. Crescimento e força para fios mais resistentes.", tag: "Preço especial" },
  { nome: "Kit Rosa Mosqueta Shampoo + Condicionador", marca: "Eico", cat: "Cabelos", img: "img/rosa-mosqueta.jpg", desc: "Renovação e cicatrização capilar. Efeito salão." },
  { nome: "Shampoo + Condicionador Morte Súbita", marca: "Lola Cosmetics", cat: "Cabelos", img: "img/morte-subita.jpg", desc: "Hidratação para cabelos danificados." },
  { nome: "Linha Morte Súbita com Máscara 450 g", marca: "Lola Cosmetics", cat: "Cabelos", img: "img/morte-subita-linha.jpg", desc: "Aloe vera, chá verde, óleo de coco e proteínas." },
  { nome: "Linha Millenar Óleos", marca: "Amend", cat: "Cabelos", img: "img/amend.jpg", desc: "Shampoo, condicionador e máscara." },
  { nome: "Seca Sem Frizz", marca: "Amend", cat: "Cabelos", img: "img/seca-sem-frizz.jpg", desc: "Leave-in para secar alinhado, sem secador." },
  { nome: "SOS Cachos Super Óleos 100 ml", marca: "Salon Line", cat: "Cabelos", img: "img/sos-cachos.jpg", desc: "Nutrição, selamento e brilho." },
  { nome: "Loção Hidratante Milk 400 ml", marca: "Nivea", cat: "Corpo e banho", img: "img/nivea.jpg", desc: "Hidratação profunda 48h para pele seca e extrasseca." },
  { nome: "Hidratante Labial Fini Beijos", marca: "Carmed", cat: "Lábios", img: "img/carmed.jpg", desc: "Efeito gloss, 10 g." },
  { nome: "Lixa Elétrica de Unhas", marca: "Nail Polisher", cat: "Unhas", img: "img/nail.jpg", desc: "Para fazer as unhas em casa." },
  { nome: "Removedor Acetona 500 ml", marca: "Ideal", cat: "Unhas", img: "img/acetona.jpg", desc: "Ótima remoção, não mancha." }
];
