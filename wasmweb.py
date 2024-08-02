import shutil, os, blob


jsesnwasms=glob.glob('pkg/*.js') + glob.glob('pkg/*.wasm')
# force mkdir "www" and force copy
shutil.rmtree('www', ignore_errors=True)