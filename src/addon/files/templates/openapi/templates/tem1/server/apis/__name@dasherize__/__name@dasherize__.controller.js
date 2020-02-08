const {
    <% routes.forEach(i=>{ %>
      <%= i['x-ape-operation']%>Service,
    <% }) %>
} = require("./<%= name %>.service.js.js");

<% routes.forEach(i=>{%>
    const <%= i['x-ape-operation']%>Controller = async (req, res) => {
        const responseBody = await <%= i['x-ape-operation']%>Service(req.body);
        res.send(responseBody);
    };
<%})%>
module.exports ={<% routes.forEach(i=>{ %><%= i['x-ape-operation']%>Controller,<% }) %>};