

<% routes.forEach(i=>{ %>
/**
 * <%= i['summary']%>
 * 
 */

  const  <%= i['x-ape-operation']%>Service= (body) => {
    // fill this funtion

  }
  <% }) %>


  module.exports ={<% routes.forEach(i=>{ %><%= i['x-ape-operation']%>Service,<% }) %>};