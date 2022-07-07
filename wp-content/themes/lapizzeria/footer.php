<footer class="site-footer">
    <?php 
        $args=array(
            'theme-location' => 'header-menu',
            'container'=>'nav',
            'container_class' => 'footer-nav',
            'after' => '<span class="separador"> | </span>'
        ); 
        wp_nav_menu( $args );
    ?>
    <div class="direccion">
        <p class="parrafo">879 Bay Avenue CA 9430</p>
        <P class="parrafo">Telefono: 4561621321</P>
    </div>
</footer>


<?php wp_footer(); ?>
</body>
</html>