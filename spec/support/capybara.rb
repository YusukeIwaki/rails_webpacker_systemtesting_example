require 'capybara'

Capybara.default_max_wait_time = 15

def trace(klass)
  klass.public_instance_methods(false).each do |method_sym|
    orig = klass.instance_method(method_sym)
    klass.define_method(method_sym) do |*args, **kwargs, &block|
      puts "START: #{klass.name}##{method_sym} #{args.map(&:to_s)} #{kwargs.map {|k, v| "#{k.to_s} => #{v.to_s}"}}"
      orig.bind(self).call(*args, **kwargs, &block)
    end
  end
end
trace(Capybara::Selenium::Driver)
trace(Capybara::Selenium::Node)
trace(Capybara::Selenium::Find)
trace(Capybara::DSL)
