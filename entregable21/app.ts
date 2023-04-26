// @deno-types="https://deno.land/x/servest/types/react/index.d.ts"
import React from "https://dev.jspm.io/react@16.13.1;
// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest/mod.ts";

const colors = ["red", "blue", "gray", "black", "green", "white"]
const colores: string[] = [];
const app = createApp();
app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
      <head>

      <title>servest < /title>
      < /head>
      < body > <div class="container" >
    <div class="row d-flex justify-content-center p-3" >
    <h3 class="text-center" > Agregar color < /h3>
    < form class= "col-sm-4 " action = "/app" method = "POST" >
    <div class="mb-3 text-center" >
    <label class="form-label" > Color < /label>
    < input type = "text" name = "color" id = "color" class= "form-control" >
    </div>
    < div class= "d-flex justify-content-center" >
    <button type="button" class= "btn btn-primary" > Submit < /button>

    < /div>
    < /form>
    < /div>
    < br >
    <div>
    {colores.map((color, index) => {
        return (
          <ul key= { index } > {colores.color}
          
    < /div>
    < /div></body >
    </html>   ),
    })}
  )})})
app.post("app", async (req, res) => {
  let color = req.body
  if (colors.includes(color)) {
    colores.push(color)
    res.redirect("/")
  } else {
    res.send("lo ingresado no es un color")
  }
});

app.listen({ port: 8888 });