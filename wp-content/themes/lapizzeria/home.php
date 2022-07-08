<?php get_header(); ?>

    <?php
        $pagina_blog=get_option("page_for_posts");
        $imagen_id= get_post_thumbnail_id($pagina_blog);
        $imagen_src = wp_get_attachment_image_src($imagen_id,'full')[0];

       
    ?>

    <div class="hero" style="background-image: url(<?php echo $imagen_src; ?>)">
        <div class="contenido-hero">
            <h1><?php echo get_the_title($pagina_blog); ?></h1>
        </div>
    </div>
    <div class="seccion contenedor">
        <main class="contenido-principal">
            <?php while(have_posts()): the_post();?>
                <article class="entrada-blog">
                    <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
                </article>

                <header class="informacion-entrada">
                    <div class="fecha">
                        <?php  the_time("d"); ?>
                        <span class="test"><?php the_time("M"); ?></span>
                    </div>
                    <div class="titulo-entrada">
                        <h2><?php the_title(); ?></h2>
                    </div>
                </header>

                <p class="autor">
                    Escrito por: 
                    <?php the_author(); ?>
                </p>

                <div class="contenido-entrada">
                    <?php the_excerpt(); ?>

                    <a class="boton boton-primario" href="<?php the_permalink(); ?>">Leer mas</a>
                </div>
                
            <?php endwhile;?>
        </main>
    </div>

<?php get_footer(); ?>
