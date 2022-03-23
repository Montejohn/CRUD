var dados = []

function ApagaRegistro(id) {
  let _confirm = confirm("Deseja realmente excluir este registro?")

  if (_confirm) {
    for (let i = 0; i < dados.length; i++) {
      if (dados[i].ID == id) {
        dados.splice(i, 1)
      }
    }

    Populatabela()

  }
}

function editaregistro(id) {
  $("#modalregistro").modal("show")

  dados.forEach(function (item) {

    if (item.ID == id) {
      $("#hdid").val(item.ID)
      $("#txtnome").val(item.nome)
      $("#txtsobrenome").val(item.sobrenome)
      $("#txtdatanascimento").val(item.datanascimento.substr(6, 4) + "-" + item.datanascimento.substr(3, 2) + "-" + item.datanascimento.substr(0, 2))
      $("#txtsonho").val(item.sonho)

      let registro = {}

    }

  })

}

function Populatabela() {
  if (Array.isArray(dados)) {

    localStorage.setItem("__dados__", JSON.stringify(dados))

    $("#tbldados tbody").html("")


    dados.forEach(function (item) {


      $("#tbldados tbody").append(`<tr>
        <td>${item.ID}</td>
        <td>${item.nome}</td>
        <td>${item.sobrenome}</td>
        <td>${item.datanascimento}</td>
        <td>${item.sonho}</td>
        <td><button type="button" class="btn btn-primary"  onclick="javascript:editaregistro(${item.ID});"><i class="fa fa-edit" /></button></td>
        <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.ID});"><i class="fa fa-trash" /></button></td>

      </tr`)

    })
  }
};

$(function () {

  if (localStorage.hasOwnProperty("__dados__")) { dados = JSON.parse(localStorage.getItem("__dados__")) }


  if (dados) {
    Populatabela()
  }

  $("#btnsalvar").click(function () {

    let _id = $("#hdid").val()
    let nome = $("#txtnome").val()
    let sobrenome = $("#txtsobrenome").val()
    let datanascimento = new Date($("#txtdatanascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
    let sonho = $("#txtsonho").val()

    if (!_id || _id == "0") {
      let registro = {}
      
      registro.nome = nome
      registro.sobrenome = sobrenome
      registro.datanascimento = datanascimento
      registro.sonho = sonho



      registro.ID = dados.length + 1
      dados.push(registro)
    }
    else {
      dados.forEach(function (item) {
        if (item.ID == _id) {
          item.nome = nome
          item.sobrenome = sobrenome
          item.datanascimento = datanascimento
          item.sonho = sonho


        }

      })
    }

    alert("Registro salvo com sucesso")
    $("#modalregistro").modal("hide")

    $("#hdid").val("0")
    $("#txtnome").val("")
    $("#txsobrenome").val("")
    $("#txtdatanascimento").val("")
    $("#txtsonho").val("")


    Populatabela()



  })
})
