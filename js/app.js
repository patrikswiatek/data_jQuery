var $ = window.jQuery;

$(document).ready(() => {
  remove = () => {
    $(".del").click(function() {
      $(this)
        .closest("tr")
        .remove();
    });
  }
  remove();
  $(".add-form").on("submit", function(e) {
    e.preventDefault();
    if (
      ($("input[name=name]").val() == "",
      $("input[name=age]").val() == "",
      $("input[name=downtown]").val() == "")
    ) {
      $(".alert").addClass("active");
      $(".remove").click(function() {
        $(".alert").removeClass("active");
      });
    } else {
      var name = $("input[name=name]").val();
      var age = $("input[name=age]").val();
      var team = $("#team").val();
      var downtown = $("input[name=downtown]").val();
      var defVision = $("#defVision").val();
      $(".first-tr").after(
        "<tr><td>" +
          name +
          "</td><td>" +
          age +
          "</td><td>" +
          team +
          "</td><td>" +
          downtown +
          "</td><td>" +
          defVision +
          '</td><td class="static"><span class="button del">-</span></td></tr>'
      );
      remove();
      $(
        "input[name=name], input[name=age], #team, input[name=downtown], #defVision"
      ).val("");
    }
  });

  $("thead tr").on("click", () => {
    $('#box').find('p').remove();
    $('#result').empty();
    var tbl = $(".table tr:has(td)")
      .map(function(i, v) {
        var $td = $("td", this);
        return {
          id: i++,
          name: $td
            .eq(0)
            .text()
            .toUpperCase(),
          age: $td.eq(1).text(),
          team: $td
            .eq(2)
            .text()
            .toUpperCase(),
          downtown: $td
            .eq(3)
            .text()
            .toUpperCase(),
          defVision: $td.eq(4).text()
        };
      })
      .get();
    function checkRows(row1, row2) {
      if (
        row1.age === row2.age ||
        row1.team === row2.team ||
        row1.downtown === row2.downtown ||
        (row1.defVision === "Yes" && row2.defVision === "Yes")
      )
        return false;
      else return true;
    }

    var pary = [];
    for (var i = 0; i < tbl.length - 1; i++) {
      if (checkRows(tbl[i], tbl[i + 1])) {
        pary.push([tbl[i], tbl[i + 1]]);
        i++;
      }
    }
    console.log(pary);

    var print = o => {
      var str = "";
      for (var p in o) {
        if (typeof o[p].name == "string") {
          str += "<li class='lead'>" + o[p].name + "</li>";
        } else {
          str += print(o[p]);
        }
      }
      return str;
    };
    $("#box").addClass("jumbotron");
    $("#result").append(print(pary));
    $("#result li:even").after("--");
    $("#result").before(
      "<p style='font-size:150%'>NUMBER OF COUPLES - " + pary.length + "</p>"
    );
  });
});
