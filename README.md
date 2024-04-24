## Forest Friends

This is an app meant for helping to organize a summer camp. 

The 'front page' faces the public and allows people to fill out a form to sign up for a spot in the camp. The data is delivered to a PostgreSQL database.

People who work for the company and help organize the camp can log in and see a list of reservations that have been made. When someone pays for their reservation the employee can mark it as paid.

The app is modeled on a real business in Vancouver that was using Google Forms and Sheets. It replaces this with a React app and database. So that's all it does - take in the data then allow viewing the data.

Of course in terms of expansion it is very flexible. Ideas for next things to build are:
- Manage oversubscription. This could be a hard limit that just prevents signup when a camp is full. However, it may be better to just display a table of stats for how full things are (should the server text the employee to let them know if the camp gets full?). This is more flexible. Parents/gaurdians will know what is going on without being just turned away. The response from the business may actually be to contact them and discuss opening another camp slot to accomodate them.

- Integrate payment, likely with Stripe. 

- Captcha to filter out bot signups
