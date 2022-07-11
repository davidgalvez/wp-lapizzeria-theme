            <header class="informacion-entrada">
                <div class="fecha">
                    <time>
                        <?php  the_time("d"); ?>
                        <span class="test"><?php the_time("M"); ?></span>
                    </time>
                </div>
                
            </header>

            <p class="autor">
                Escrito por: 
                <span><?php the_author(); ?></span>
            </p>