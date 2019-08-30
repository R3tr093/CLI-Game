# CLI- Raven Role Play Game

<p> I just build a game coz i really like wasting my time.</p>



## :cd: How to use ?

<p> If u want to use this you can go on npm, also you need to install Node on your remote. </p>

<p>  :file_folder: Find a link ton install Node <a href="https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/"> Here </a></p>

<p> Right then your able to start the program upload the repository, go in your folder directory into Story, at the root you can start with the command below </p>

<p><b><pre><code>   npm init</pre></code> </b></p>

<p><i> You can skip all the question about package.json</i> </p>

<p> Then a last one </p>

<p> <b><pre><code>  npm install </pre></code></b></p>

<p> <b><pre><code>  npm link </pre></code></b></p>

<p> Finally start the program with the command : <b> play </b></p>

<p> You may need to fix something for use this command from your CLI, see how about below. Also if it doesnt work you can use this one <br>  <br>:arrow_right: <b> node index.js </b></p>

##  :white_check_mark: Some bug FIX


<p> In developpement we encountered some bug, the first one is to be enable to active a custom command on the CLI </p>

<p> Fix them with theses command from your root </p>

<ul>

<pre><code><li><b><i>mkdir ~/.npm-global</b></i></li></pre></code>
<pre><code><li> <b><i>npm config set prefix '~/.npm-global'</b></i></li></pre></code>
<pre><code><li> <b><i>export PATH=~/.npm-global/bin:$PATH</b></i></li></pre></code>
<pre><code><li> <b><i> source ~/.profile </b></i></li><br></pre></code>

<p> :link: <a href="https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally"> Sourced from here </a></p>

</ul>
